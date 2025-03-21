import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { items, formData } = data;

    // Формируем сообщение для Telegram
    let message = '🛒 *Новый заказ*\n\n';
    
    // Информация о заказчике
    message += '*Информация о заказчике:*\n';
    message += `👤 Имя: ${formData.name}\n`;
    message += `📱 Телефон: \`${formData.phone}\`\n`;
    message += `📧 Email: \`${formData.email}\`\n`;
    message += `🚚 Доставка: ${formData.delivery === 'pickup' ? 'Самовывоз' : 'Не указано'}\n`;
    if (formData.comment) {
      message += `💬 Комментарий: ${formData.comment}\n`;
    }
    
    message += '\n*Заказанные товары:*\n';
    let totalPrice = 0;

    items.forEach((item: any) => {
      const price = parseInt(item.price.replace(/\D/g, ''));
      const itemTotal = price * item.quantity;
      totalPrice += itemTotal;

      message += `\n📦 ${item.title}\n`;
      message += `Количество: ${item.quantity}\n`;
      message += `Цена: \`${price} ₽\`\n`;
      message += `Сумма: \`${itemTotal} ₽\`\n`;
    });

    message += `\n💰 *Общая сумма:* \`${totalPrice} ₽\``;

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
    console.error('Error sending order:', error);
    return NextResponse.json(
      { error: 'Failed to send order' },
      { status: 500 }
    );
  }
} 