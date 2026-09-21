function PriceText({ price }: { price: number | null }) {
  const value = Number(price ?? 0);
  const [whole, cents] = value.toFixed(2).split('.');

  return (
    <p className="flex items-start text-[#0f1111]">
      <span className="mt-1 text-[12px]">$</span>
      <span className="text-[28px] font-medium leading-none">{whole}</span>
      <span className="mt-1 text-[12px]">{cents}</span>
    </p>
  );
}

export default PriceText;