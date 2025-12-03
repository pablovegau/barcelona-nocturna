import type { UIDataTypes, UIMessagePart, UITools } from 'ai';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';

export const Message = ({
  role,
  parts,
}: {
  role: string;
  parts: UIMessagePart<UIDataTypes, UITools>[];
}) => {
  const className = role === 'user' ? styles.user : styles.ai;

  const text = parts
    .map((part) => {
      if (part.type === 'text') {
        return part.text;
      }
      return '';
    })
    .join('');
  return (
    <div className={className}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};
