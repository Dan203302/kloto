type Manager = {
  name: string;
  phone: string;
  email: string;
};

const managers: Manager[] = [
  {
    name: 'Дернова Елена',
    phone: '+ 7 (903) 507-93-93',
    email: 'elenakloto@mail.ru'
  },
  {
    name: 'Бугаков Роман',
    phone: '+ 7 (926) 382-89-76',
    email: 'klotoprint@bk.ru'
  },
  {
    name: 'Богомолова Елена',
    phone: '+7 (968) 826-37-50',
    email: 'klotoprint@bk.ru'
  }
];

export default function ContactsTeam() {
  return (
    <div className="relative w-full">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex justify-center">
          {/* Верхняя секция с заголовком */}
          <div className="w-full max-w-[760px] text-center px-4">
            <div className="text-[64px] leading-[70.4px] font-bold text-black mb-6">
              МЕНЕДЖЕРЫ ОФИСА
            </div>
            <h4 className="text-[24px] leading-[31.2px] font-medium text-black/70 mb-16">
              Самая важная ценность любой компании — это люди, которые в ней работают
            </h4>
          </div>
        </div>

        {/* Сетка менеджеров */}
        <div className="flex flex-wrap justify-center">
          {managers.map((manager, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 max-w-[380px] px-4 mb-10 text-center">
              <div className="text-[24px] leading-[31.2px] text-black mb-2">
                {manager.name}
              </div>
              <div className="text-[18px] leading-[23.4px] text-black/70">
                {manager.phone}
                <br />
                e-mail: {manager.email}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 