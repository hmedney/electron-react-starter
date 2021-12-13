const data = window.mainBridge.getLocalFileContents();

export default function Page2() {
  return (
    <div className="card w-50">
      <div className="card-header">Loaded from local file:</div>
      <div className="card-body">
        <small>
          <pre className="m-0">{JSON.stringify(data, null, 2)}</pre>
        </small>
      </div>
    </div>
  );
}
