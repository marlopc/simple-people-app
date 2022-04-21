const ArrowRight = ({ size = 24 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" />
    </svg>
  );
};

export default ArrowRight;
