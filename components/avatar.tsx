import Link from 'next/link'

type Props = {
  name: string
  picture: string
  link: string
}

const Avatar = ({ name, picture, link }: Props) => {
  return (
    <div className="flex items-center">
      <Link href={link}>
        <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      </Link>
      <div className="text-xl font-bold">
        <Link href={link} className="hover:underline">
          {name}
        </Link>
      </div>
    </div>
  );
}

export default Avatar
