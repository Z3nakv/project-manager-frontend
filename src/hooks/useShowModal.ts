import { useNavigate, useSearchParams } from "react-router"

const useShowModal = (query: string) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryValue = searchParams.get(query);

  const showModal = Boolean(queryValue);

  const handleClose = () => {
    navigate(location.pathname, { replace: true });
  };

  return {
    queryValue,
    showModal,
    handleClose
  };
};

export default useShowModal