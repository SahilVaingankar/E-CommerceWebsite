function Sidebar({ isClicked }: { isClicked: boolean }) {
  return (
    <div
      className={`sm:absolute fixed top-10 sm:top-0 left-0 flex flex-col h-[100svh] w-0 overflow-hidden ${
        isClicked ? "w-50" : "w-0 sm:w-50"
      } bg-white`}>
      <ul>
        <h1>Categories</h1>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default Sidebar;
