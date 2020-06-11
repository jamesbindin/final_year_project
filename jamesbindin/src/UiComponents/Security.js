class Security{

   async hashPassword(string){
     return await crypto.subtle.digest("SHA-256", new TextEncoder()
                       .encode(string))
                       .then(hashed => {
                         return Array.prototype.map.call(new Uint8Array(hashed), x => ('00' + x.toString(16)).slice(-2)).join('');
                       })
  }
}
export default Security;
