const WizelineIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  width,
  height,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 202 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M41.2873 0L32.9239 28H24.8056L20.7624 13.0797L16.6819 28H8.56357L0.200195 0H9.97522L13.5177 14.8781L17.5715 0H23.916L27.9538 14.8781L31.5495 0H41.2873Z" />
    <path d="M54.0027 0V28H44.9468V0H54.0027Z" />
    <path d="M82.0121 19.7566V28H58.4614V21.1965L69.206 8.23809H58.8237V0H81.2876V6.85628L70.5164 19.7566H82.0121Z" />
    <path d="M106.373 20.4792V28H86.4551V0H106.01V7.52081H95.5536V10.6378H104.716V17.1196H95.5536V20.4792H106.373Z" />
    <path d="M130.856 19.7566V28H111.226V0H120.313V19.7566H130.856Z" />
    <path d="M144.391 0V28H135.303V0H144.391Z" />
    <path d="M176.225 0V28H168.027L159.136 13.8391V28H150.048V0H158.252L167.137 14.1609V0H176.225Z" />
    <path d="M201.8 20.4792V28H181.888V0H201.438V7.52081H190.976V10.6378H200.143V17.1196H190.976V20.4792H201.8Z" />
  </svg>
);

export default WizelineIcon;
