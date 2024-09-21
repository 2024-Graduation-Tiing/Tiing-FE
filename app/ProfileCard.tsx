import Link from 'next/link';

//
//
//

type DynamicObject = { [key: string]: string };

interface ProfileInfoProps {
  type: string;
  id: string; // email
  title: string; // name
  image: string;
  keywords: DynamicObject;
  subtitle: string; // field
  description: string;
}

interface ProposalInfoProps {
  type: string;
  id: string; // id
  title: string; // title
  image: string;
  keywords: DynamicObject;
  subtitle: string; // company
  description: string;
}

//
//
//

const ProfileCard: React.FC<ProfileInfoProps | ProposalInfoProps> = ({
  type,
  id,
  title,
  image,
  keywords,
  subtitle,
  description,
}: ProfileInfoProps) => {

  return (
    <div className="w-[220px] py-4 inline-block break-inside-avoid">
      <Link
        href={type === 'profile' ? `/profile/${id}` : `/proposal/${id}`}
        className="w-full flex"
      >
        <img src={image} alt="profile_img" className="mb-3 rounded-16" />
      </Link>
      <p className="w-full *:text-md mb-2 font-medium">{title}</p>
      <div className="w-full grid grid-cols-3 gap-x-2">
        {Object.entries(keywords).map(([key, value]) => (
          <span key={key} className="keyword text-xs">
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
