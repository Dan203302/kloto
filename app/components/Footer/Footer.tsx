import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] py-[61px] px-8">
      <div className="max-w-[968px] mx-auto flex flex-col items-center">
        {/* Социальные иконки */}
        <div className="flex gap-[10px] mb-10">
          <Link
            href="https://yandex.ru/profile/1086900242?no-distribution=1&source=wizbiz_new_map_single"
            className="w-[56px] h-[56px] flex items-center justify-center text-[#5552E8] hover:text-[#4441BA] bg-white rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 10.5C3 5.5293 7.0293 1.5 12 1.5C16.9707 1.5 21 5.5293 21 10.5C21 12.9845 19.9933 15.234 18.3652 16.8626C17.9403 17.2878 17.3649 17.7626 16.7426 18.2762C14.9802 19.7306 12.8413 21.4959 12.675 23.325C12.6413 23.6961 12.3726 24 12 24C11.6274 24 11.3587 23.6961 11.325 23.325C11.1587 21.4959 9.01978 19.7306 7.25739 18.2762C6.63509 17.7626 6.05973 17.2878 5.63475 16.8626C4.00665 15.234 3 12.9845 3 10.5ZM15.1501 10.5016C15.1501 12.2412 13.7398 13.6516 12.0001 13.6516C10.2604 13.6516 8.8501 12.2412 8.8501 10.5016C8.8501 8.76186 10.2604 7.35156 12.0001 7.35156C13.7398 7.35156 15.1501 8.76186 15.1501 10.5016Z"
              />
            </svg>
          </Link>

          <Link
            href="https://vk.com/klotoprint"
            className="w-[56px] h-[56px] flex items-center justify-center text-[#5552E8] hover:text-[#4441BA] bg-white rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.057 19.3021H20.4367C19.4451 19.3021 19.1386 18.5133 17.3566 16.7073C15.8046 15.2048 15.1179 15.002 14.7363 15.002C14.2014 15.002 14.0482 15.1552 14.0482 15.893V18.2594C14.0482 18.8964 13.8453 19.278 12.1656 19.278C9.39198 19.278 6.3119 17.5983 4.14984 14.4671C0.892471 9.88756 0 6.45139 0 5.73922C0 5.35759 0.153253 5.0015 0.890969 5.0015H3.51129C4.17238 5.0015 4.4278 5.3065 4.68322 6.01868C5.97986 9.75985 8.14342 13.0428 9.03439 13.0428C9.36494 13.0428 9.51819 12.8895 9.51819 12.0511V8.18074C9.41602 6.39881 8.47397 6.24706 8.47397 5.61151C8.47397 5.305 8.72939 5 9.13506 5H13.2579C13.8183 5 14.0211 5.305 14.0211 5.96609V11.1842C14.0211 11.7431 14.2765 11.9475 14.4283 11.9475C14.7588 11.9475 15.0398 11.7431 15.6498 11.1331C17.5339 9.02063 18.8816 5.76326 18.8816 5.76326C19.0604 5.38163 19.3654 5.02554 20.028 5.02554H22.6483C23.4371 5.02554 23.6159 5.43121 23.4371 5.99163C23.1066 7.51965 19.9003 12.0481 19.9003 12.0481C19.6208 12.5064 19.5187 12.7092 19.9003 13.2201C20.1798 13.6017 21.0963 14.3905 21.7078 15.1027C22.8271 16.3753 23.6911 17.4435 23.9209 18.1827C24.1764 18.919 23.7932 19.3006 23.0555 19.3006L23.057 19.3021Z"
              />
            </svg>
          </Link>
        </div>

        {/* Меню */}
        <ul className="flex gap-[40px] mb-10 text-[18px] leading-[23.4px] text-black/70">
          <li>
            <Link
                href="/services"
                className="hover:text-[#5552E8] transition-colors"
            >
              Услуги
            </Link>
          </li>
          <li>

            <Link 
              href="/delivery" 
              className="hover:text-[#5552E8] transition-colors"
            >
              Оплата и доставка
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className="hover:text-[#5552E8] transition-colors"
            >
              О нас
            </Link>
          </li>
          <li>
            <Link 
              href="/contacts" 
              className="hover:text-[#5552E8] transition-colors"
            >
              Контакты
            </Link>
          </li>
        </ul>

        {/* Логотип */}
        <Link href="/" className="block">
          <Image
            src="https://klotoprint.ru/images/06207f65694be544fc50d5d13927c51b.webp"
            alt="Klotoprint Logo"
            width={137}
            height={44}
            className="h-11 w-auto"
            priority
          />
        </Link>
      </div>
    </footer>
  );
} 