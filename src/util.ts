import fs from 'node:fs';
import path from 'node:path';
import readline from 'readline';
import { red } from 'kolorist';

type Framework = {
  templateName: string;
  desc: string;
};

export const getTemplates = async (): Promise<Framework[]> => {
  const templatesFiles = await fs.readdirSync(path.join('templates'));
  return Promise.all<Framework>(
    templatesFiles.map((dirName) => {
      return new Promise(async (res) => {
        const firstLine = await readFileFirstLine(path.join('templates', dirName, 'README.md'));
        res({
          templateName: dirName,
          desc: firstLine,
        });
      });
    }),
  );
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
