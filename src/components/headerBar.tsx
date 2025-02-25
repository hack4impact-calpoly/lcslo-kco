export default function Head() {
  return (
    <header
      style={{
        backgroundColor: "#D29561",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "8vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          cursor: "pointer",
          position: "absolute",
          left: "1rem",
        }}
      >
        <div style={{ width: "30px", height: "3px", backgroundColor: "#3b3b3b", borderRadius: "3px" }}></div>
        <div style={{ width: "30px", height: "3px", backgroundColor: "#3b3b3b", borderRadius: "3px" }}></div>
        <div style={{ width: "30px", height: "3px", backgroundColor: "#3b3b3b", borderRadius: "3px" }}></div>
      </div>
      <img src="Logo_Banner.png" style={{ width: "auto", height: "75%" }} />
    </header>
  );
}
