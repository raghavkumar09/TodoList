

const Navbar = () => {
  return (
    <div className=''>
      <nav className='flex justify-between bg-black text-white p-3'>
        <h1>Logo</h1>
        <ul className='flex items-center gap-3'>
          <li className='cursor-pointer hover:font-bold'>Home</li>
          <li className='cursor-pointer hover:font-bold'>About</li>
          <li className='cursor-pointer hover:font-bold'>Contact</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
