import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type AppIdea = {
    title : Text;
    description : Text;
  };

  var latestAppIdea : ?AppIdea = null;

  public shared ({ caller }) func submitAppIdea(title : Text, description : Text) : async () {
    if (title.isEmpty() or description.isEmpty()) {
      Runtime.trap("Both title and description must be provided.");
    };
    latestAppIdea := ?{ title; description };
  };

  public query ({ caller }) func getLatestAppIdea() : async AppIdea {
    switch (latestAppIdea) {
      case (null) { Runtime.trap("No app idea has been submitted yet.") };
      case (?idea) { idea };
    };
  };
};
