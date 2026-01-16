import Image from 'next/image';

export default function SocialIcons () {
  return (
    <>
      <div className="grid grid-cols-2 gap-12 w-full max-w-80">
        <button
          className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-300 hover:bg-green-100 active:scale-95 transition-colors font-medium text-sm cursor-pointer"
          type="button"
          onClick={() => console.log( 'Google login' )}
        >

          <Image src="/Google.svg" alt="Google Logo" width={26} height={26} />
          Google
        </button>
        <button
          className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-300 hover:bg-green-100 active:scale-95 transition-colors font-medium text-sm cursor-pointer"
          type="button"
          onClick={() => console.log( 'Facebook login' )}
        >
          <Image src="/Facebook.svg" alt="Facebook Logo" width={26} height={26} />
          Facebook
        </button>
      </div>
    </>
  );
}