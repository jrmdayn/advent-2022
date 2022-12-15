import { data } from './day7_data';

type DirNode = {
  name: string;
  subdirs: Record<string, DirNode>;
  files: Record<string, number>;
  parent: DirNode | null;
  size: number | null;
};

const evaluateNode = (node: DirNode): number => {
  let subDirsSize = 0;
  let res = 0;
  for (const sub of Object.values(node.subdirs)) {
    res += evaluateNode(sub);
    subDirsSize += sub.size;
  }

  const fileSizes = Object.values(node.files).reduce((x, y) => x + y, 0);

  node.size = subDirsSize + fileSizes;

  if (node.size <= 100000) {
    res += node.size;
  }

  return res;
};

export const day7 = () => {
  const lines = data.split('\n').slice(2);
  const root: DirNode = {
    name: '/',
    parent: null,
    files: {},
    subdirs: {},
    size: null,
  };
  let current = root;
  for (const line of lines) {
    if (line.startsWith('$ cd ..')) {
      if (current.parent === null) {
        throw new Error('Unexpected instruction: cd ..');
      } else {
        current = current.parent;
      }
    } else if (line.startsWith('$ cd')) {
      const dirName = line.substring(4);
      const tmp: DirNode = {
        name: dirName,
        parent: current,
        files: {},
        subdirs: {},
        size: null,
      };
      current.subdirs[dirName] = tmp;
      current = tmp;
    } else if (line.startsWith('$ ls') || line.startsWith('dir ')) {
      // do nothing
    } else {
      const [size, fileName] = line.split(' ');
      current.files[fileName] = Number(size);
    }
  }
  console.log('part1', evaluateNode(root));
  const freeSpace = 70000000 - root.size;
  const requiredToFree = 30000000 - freeSpace;
  console.log(requiredToFree);

  const findSmallestDirToDelete = (node: DirNode): number => {
    const x = Object.values(node.subdirs)
      .map(findSmallestDirToDelete)
      .filter((size) => size >= requiredToFree)
      .sort();
    if (x.length >= 1) {
      return x[0];
    }
    if (node.size >= requiredToFree) {
      return node.size;
    }
    return 0;
  };

  console.log(findSmallestDirToDelete(root));
};
