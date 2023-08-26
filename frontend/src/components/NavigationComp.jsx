import { useNavigate } from "react-router-dom";
import "../assets/ComponentCSS.css";

export default function NavigationComp(props) {
  const navigate = useNavigate();

  const { routeToNavigateTo, routeName } = props;

  function navigateTo(route) {
    if (route !== undefined) {
      if (route !== "edit") {
        navigate(`/${route}`);
      } else if (route === "edit") {
        navigate(`/${route}`, { state: { textData: "", creator: "" } });
      }
    }
  }

  return (
    <>
      <div className="navigate-comp">
        <button
          className="navigate-btn"
          onClick={() => navigateTo(routeToNavigateTo)}
        >
          {"Go To " + routeName}
        </button>
      </div>
    </>
  );
}
