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
  console.log(import.meta.url, '-------');
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

export const copy = (srcDir: string, dest: string) => {
  const stat = fs.statSync(srcDir);
  if (stat.isDirectory()) {
    copyDir(srcDir, dest);
  } else {
    fs.copyFileSync(srcDir, dest);
  }
};

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

export const repairPkgConfig = ({ packageName }: { packageName: string }) => {
  console.log(packageName, 'packageName');
};

export const formatTargetDir = (targetDir: string | undefined) => {
  return targetDir?.trim().replace(/\/+$/g, '');
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
