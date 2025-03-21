import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { productTitle, formData } = data;

    // Формируем сообщение для Telegram
    let message = '📋 *Новый запрос на расчет*\n\n';
    
    // Информация о товаре
    message += '*Информация о товаре:*\n';
    message += `📦 Товар: \`${productTitle}\`\n\n`;
    
    // Информация о заказчике
    message += '*Информация о заказчике:*\n';
    message += `👤 Имя: ${formData.name}\n`;
    message += `📱 Телефон: \`${formData.phone}\`\n`;
    message += `📧 Email: \`${formData.email}\`\n`;
    message += `🚚 Доставка: ${formData.delivery === 'pickup' ? 'Самовывоз' : 'Не указано'}\n`;
    message += `💬 Комментарий: ${formData.comment}\n`;

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
    console.error('Error sending request:', error);
    return NextResponse.json(
      { error: 'Failed to send request' },
      { status: 500 }
    );
  }
} 