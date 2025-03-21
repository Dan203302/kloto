import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Формируем сообщение для Telegram
    let message = '❓ *Новый вопрос*\n\n';
    
    // Информация о пользователе
    message += '*Информация о пользователе:*\n';
    message += `👤 Имя: ${formData.name}\n`;
    message += `📱 Телефон: \`${formData.phone}\`\n`;
    message += `📧 Email: \`${formData.email}\`\n\n`;
    
    // Вопрос
    message += '*Вопрос:*\n';
    message += `💭 ${formData.question}\n`;

    // Отправляем сообщение в Telegram
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Telegram message');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending question:', error);
    return NextResponse.json(
      { error: 'Failed to send question' },
      { status: 500 }
    );
  }
} 