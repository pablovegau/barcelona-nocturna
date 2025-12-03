import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

import { ChatInput } from './ChatInput/ChatInput';
import { Message } from './Message/Message';
import styles from './styles.module.css';

export default function Chat() {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/ai/genesis',
    }),
  });

  const [inputText, setInputText] = useState(
    'Un Brujah abrazado hace 27 años en la ciudad de Barcelona, pertenece al movimiento anarquista',
  );

  const hasMessages = messages.length > 0;

  return (
    <div className={`${styles.chat} ${!hasMessages ? styles.centered : ''}`}>
      {hasMessages ? (
        <div className={styles.messages}>
          {messages.map((message) => (
            <Message
              key={message.id}
              role={message.role}
              parts={message.parts}
            />
          ))}
        </div>
      ) : (
        <h1 className={styles.title}>Génesis</h1>
      )}

      <ChatInput
        input={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({
            role: 'user',
            parts: [{ type: 'text', text: inputText }],
          });
          setInputText('');
        }}
      />
    </div>
  );
}
