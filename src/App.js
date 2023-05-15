// integrate data global redux to component User
import {
  Card,
  Col,
  Container,
  ProgressBar,
  Button,
  Alert,
} from "react-bootstrap";
import { useEffect } from "react";
//useSelector = get data global state dari store redux;
//useDispatch =  function yg mengirimkan action ke store;
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./redux/store/readUsersSlice";
import { deleteUsers } from "./redux/store/deleteUsersSlice";

const User = () => {
  const { error, isLoading, users } = useSelector((state) => state.users);
  const {isLoading:isLoadingDelete, message} = useSelector((state) => state.deleteUser)
  const  dispatch = useDispatch();
  const dataUsers = users?.data || [];

  const handleOnClick = (paramId) => {
    dispatch(deleteUsers({ paramId }));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isLoading) return <ProgressBar />;
  if (error) return <div>Error !</div>;

  return (
    <>
      <Container fluid className="p-4">
        <div
          style={{
            marginTop: "5em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {dataUsers.map(({ avatar, first_name, last_name, email, id }) => (
            <Col xs={4} key={id}>
              <Card style={{ width: "18rem", marginBottom: "2em" }}>
                <Card.Img variant="top" src={avatar} />
                <Card.Body>
                  <Card.Title>
                    {first_name} {last_name}
                  </Card.Title>
                  <Card.Text>{email}</Card.Text>
                </Card.Body>

                <Button
                  onClick={() => handleOnClick(id)}
                  style={{ margin: "1em" }}
                  variant="danger"
                >
                  {isLoadingDelete ?  "Loading . . . " : "Delete"}
                </Button>
              </Card>
            </Col>
          ))}
        </div>
      </Container>
      {
        message &&  <Alert variant="danger">{message}</Alert>
      }
    </>
  );
};

export default User;
