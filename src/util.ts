import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'readline';
import { red } from 'kolorist';

type Framework = {
  templateName: string;
  desc: string;
};

export const getTemplates = async (): Promise<Framework[]> => {
  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../templates');
  const templatesFiles = await fs.readdirSync(templateDir);
  return Promise.all<Framework>(
    templatesFiles.map((dirName) => {
      return new Promise(async (res) => {
        const firstLine = await readFileFirstLine(path.join(templateDir, dirName, 'README.md'));
        res({
          templateName: dirName,
          desc: firstLine,
        });
      });
    }),
  );
};

export const createDir = async (dir: string) => {
  await fs.mkdirSync(dir, { recursive: true });
};

export const copy = async (srcDir: string, dest: string) => {
  const stat = fs.statSync(srcDir);
  if (stat.isDirectory()) {
    await copyDir(srcDir, dest);
  } else {
    await fs.copyFileSync(srcDir, dest);
  }
};

async function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    if (file !== 'package.json') {
      await copy(srcFile, destFile);
    }
  }
}

export const repairPkgConfig = (src: string, dest: string, { packageName }: { packageName: string }) => {
  const pkg = JSON.parse(fs.readFileSync(path.join(src, `package.json`), 'utf-8'));
  pkg.name = packageName;
  write(dest, `package.json`, JSON.stringify(pkg, null, 2) + '\n');
};

const write = (root, file: string, content?: string) => {
  const targetPath = path.join(root, file);
  if (content) {
    fs.writeFileSync(targetPath, content);
  }
};

export const formatTargetDir = (targetDir: string | undefined) => {
  return targetDir?.trim().replace(/\/+$/g, '');
};

export const emptyDir = async (dir: string) => {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    await fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
};

export const isEmpty = (path: string) => {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
};
const readFileFirstLine = async (filePath: string): Promise<string> => {
  return new Promise((res) => {
    try {
      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity,
      });

      rl.on('line', (line) => {
        rl.close();
        res(line);
      });
    } catch (err) {
      red('获取模板readme文件失败');
    }
  });
};

export const getPkgManager = () => {
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
  return pkgManager;
};

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}
