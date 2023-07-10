export const LoginView = () => {
  return (
    <form>
      <label>
        Ussername:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
