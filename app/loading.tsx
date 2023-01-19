import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <div className="flex-center">
      <p>Loading</p>
      <FontAwesomeIcon icon={faSpinner} className="spinner" size="xs" />
    </div>
  )
}
