var fetch = require("../../app/security/fetch_token");
var EMAIL = "admin@admin.com";
var PASSWORD = "password123";

describe("token fetcher", function(){
  it("grabs a token off the API", function(done){
    var ok = function(jwt){
      expect(jwt.sub).toBe(EMAIL);
      expect(jwt.iss).toBe("//localhost:3000");
      var keys = Object.keys(jwt);
      expect(keys).toContain("iat");
      expect(keys).toContain("exp");
      done();
    };

    var no = function(error){
      fail("Expected success response from server while testing token auth.");
      done();
    };

    fetch( PASSWORD, EMAIL ).then(ok, no)
  });

  it("handles failure", function(done) {
    function no(error) {
      expect(error.response.status).toEqual(422);
      done();
    }
    function ok() {
      fail("Expected this request to fail");
      done();
    }
    fetch( "wrong_password", EMAIL ).then(ok, no)
  });
});
