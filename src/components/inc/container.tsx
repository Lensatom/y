

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Container = ({className, children, ...props}:Props) => {
  return (
    <div
      className={`px-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container