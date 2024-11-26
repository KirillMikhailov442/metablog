import { FC } from 'react';
import styles from './File.module.scss';
import { FiFile } from 'react-icons/fi';

interface IFile {
  fileName: string;
  pathToFile: string;
}

const File: FC<IFile> = ({ fileName, pathToFile }) => {
  return (
    <a className={styles.wrapper} href={pathToFile} target="_blank">
      <FiFile size={25} />
      <p className={styles.name}>{fileName}</p>
    </a>
  );
};

export default File;
