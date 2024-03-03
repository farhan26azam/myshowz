const Footer = () => {
    return (      <footer className="bg-gray-900 text-white py-8">
    <div className="conatiner text-center mb-8">
      <a href="/" className="text-pink-500 hover:text-pink-500 m-4">
        Home
      </a>
      <a href="/" className="text-white hover:text-pink-500 m-4">
        Stories
      </a>
      <a href="/" className="text-white hover:text-pink-500 m-4">
        Contact
      </a>
      <a href="/auth" className="text-white hover:text-pink-500 m-4">
        SignIn
      </a>
    </div>
    <div className="container mx-auto text-center">
      <p>&copy; 2023 Stories Website. All rights reserved.</p>
    </div>
  </footer>);
}

export default Footer;