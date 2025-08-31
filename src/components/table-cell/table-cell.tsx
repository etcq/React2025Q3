import { useEffect, useState, memo } from 'react';
import styles from '../table-row/table-row.module.scss';

const TableCell = memo(function TableCell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    setIsAnimated(true);
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, [children]);
  return (
    <td className={isAnimated ? styles.animation : ''}>{children ?? 'N/A'}</td>
  );
});

export { TableCell };
