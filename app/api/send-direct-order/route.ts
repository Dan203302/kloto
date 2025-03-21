import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Формируем сообщение для Telegram
    let message = '🎯 *Заказ онлайн без корзины*\n\n';
    
    // Информация о заказчике
    message += '*Информация о заказчике:*\n';
    message += `👤 Имя: ${formData.name}\n`;
    message += `📱 Телефон: \`${formData.phone}\`\n`;
    message += `📧 Email: \`${formData.email}\`\n`;
    
    // Информация о заказе
    message += '\n*Информация о заказе:*\n';
    message += `📝 Тип заказа: ${formData.orderType}\n`;
    if (formData.quantity) {
      message += `📦 Количество: ${formData.quantity}\n`;
    }
    if (formData.size) {
      message += `📏 Размер: ${formData.size}\n`;
    }
    message += `💬 Комментарий: ${formData.comment || 'Не указан'}\n`;

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
    console.error('Error sending direct order:', error);
    return NextResponse.json(
      { error: 'Failed to send direct order' },
      { status: 500 }
    );
  }
} 