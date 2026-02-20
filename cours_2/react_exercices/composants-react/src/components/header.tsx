const Header = () => {
  const liste = ["React","TypeScript","Vite", "CSS"]
  const val = getRandomString(liste)
  return (
    <div>
        <header>
            <Logo/>
            <h1>Bienvenue sur mon app React</h1>
            <h2>Cette page utilise une technologie {val}</h2>
        </header>
    </div>
  );
};


function getRandomString(array: Array<String>): String {
  return array[Math.floor(Math.random() * array.length)]
}

function Logo(){
  return <img src="src/assets/react.svg" className="logo react" alt="React logo" />;
}

export default Header;
