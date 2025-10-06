import Background from "./components/background.tsx";
import Card from "./components/card.tsx";
import DashedBorder from "./components/dashed-border.tsx";
import ExpandingBox from "./components/expanding-box.tsx";
import Profile from "./components/profile.tsx";

function App() {
  return (
    <main>
      <Background />

      <div className="relative inset-0 flex items-start justify-end p-[8vw]">
        <ExpandingBox
          viewTransitionName="expanding-box--profile"
          pathname="/me"
        >
          {({ isExpanded, toggleBox }) => (
            <>
              {isExpanded ? (
                <Profile onShrink={toggleBox} />
              ) : (
                <Card onExpand={toggleBox} />
              )}

              <DashedBorder />
            </>
          )}
        </ExpandingBox>
      </div>
    </main>
  );
}

export default App;
