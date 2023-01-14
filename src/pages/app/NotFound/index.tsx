export function NotFound() {
  return (
    <div>
      <h1>Not found ou Core</h1>
      <h2>
        Se for uma rota inexistente ou que o user não tenha acesso, Not Found
      </h2>
      <h2>
        Se o user fizer logout ou o token de autenticação expirar, redireciona
        para o Core
      </h2>
    </div>
  )
}
