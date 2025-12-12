import Logo from "../_icons/logo";
export default function Footer() {
  return (
    <div className="h-[755px] self-stretch bg-[#18181B]">
      {/* header container */}
      <div className="flex w-full py-7 px-[98px] items-center gap-[34px] bg-[#EF4444]">
        <h2 className="text-white font-Inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
          Fresh fast Delivered
        </h2>
      </div>
      {/* content container */}
      <div className="flex w-[1264px] items-start gap-[220px]">
        <Logo />
        <div className="flex items-start gap-28">
          <div className="flex flex-col items-start w-[122px] gap-4">
            <p className="text-gray-500 text-base font-normal leading-7 self-stretch">
              NOMNOM
            </p>
            <p className="text-white text-base font-normal leading-6 self-stretch">
              Home
            </p>
            <p className="text-white text-base font-normal leading-6 self-stretch">
              Contact us
            </p>
            <p className="text-white text-base font-normal leading-6 self-stretch">
              Delivery zone
            </p>
          </div>
          <div className="flex items-start gap-14">
            <div className="flex flex-col items-start gap-4 w-[132px]">
              <p className="text-gray-500 font-inter text-base font-normal leading-7 self-stretch">
                MENU
              </p>
              <p className="text-white font-inter text-base font-normal leading-6 self-stretch">
                Your text here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
