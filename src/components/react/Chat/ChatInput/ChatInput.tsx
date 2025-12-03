import { Button } from '@react/Button/Button';
import styles from './styles.module.css';

export const ChatInput = ({
  input,
  onChange,
  onSubmit,
}: {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <textarea
        className={styles.chatInput}
        value={input}
        placeholder="Se que no recuerdas nada... pero no te preocupes, soy tu Sire, te ayudare..."
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.buttonContainer}>
        <Button type="submit" icon="send" variant="tertiary" rounded />
      </div>
    </form>
  );
};
