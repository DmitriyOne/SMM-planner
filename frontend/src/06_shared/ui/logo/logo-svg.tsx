export const LogoSVG = ({ isCurrentPath }: { isCurrentPath: boolean }) => {
  return (
    <svg
      width='70'
      height='40'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='0'
        y='0'
        rx='10'
        ry='10'
        width='70'
        height='40'
        fill='currentColor'
      />

      <text
        x='50%'
        y='50%'
        fontFamily='Arial'
        fontSize='18'
        fontWeight='bold'
        fill='#fff'
        textAnchor='middle'
        dominantBaseline='central'
        cursor={isCurrentPath ? "pointer" : "default"}
      >
        SMM
      </text>
    </svg>
  )
}
