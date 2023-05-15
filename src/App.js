// integrate data global redux to component User
import { Card, Col, Container, ProgressBar } from "react-bootstrap";
import { useEffect } from "react";
//useSelector = get data global state dari store redux;
//useDispatch =  function yg mengirimkan action ke store;
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./redux/store/usersSlice";

const User = () => {
  const { error, isLoading, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const dataUsers = users?.data || [];

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isLoading) return <ProgressBar />;
  if (error) return <div>Error !</div>;

  return (
    <Container fluid className="p-4">

      <div style={{
        marginTop: "5em",
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexWrap: "wrap"
      }}>

      {dataUsers.map(({avatar,first_name, last_name, email, id}) => (
        <Col xs={4} key={id}>
          <Card className="mb-1" style={{width: "18rem"}}>
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
              <Card.Title>{first_name} {last_name}</Card.Title>
              <Card.Text>{email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
      </div>
    </Container>
  );
};

export default User;


