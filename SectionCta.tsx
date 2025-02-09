import CustomButton from './CustomButton';

interface SectionCtaProps {
  text: string;
  href: string;
}

const SectionCta: React.FC<SectionCtaProps> = ({ text, href }) => {
  return (
    <div className="flex justify-center items-center py-2">
      <CustomButton text={text} href={href} />
    </div>
  )
}

export default SectionCta