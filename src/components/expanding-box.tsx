import { type ReactNode, useCallback, useEffect, useState } from "react";
import cr from "../utils/cr.ts";
import { trackEvent } from "../utils/analytics.ts";

type ExpandingBoxProps = {
  children: (args: { isExpanded: boolean; toggleBox: () => void }) => ReactNode;
  className?: string;
  pathname?: string;
  viewTransitionName: string;
};

export default function ExpandingBox({
  children,
  className,
  pathname,
  viewTransitionName,
}: ExpandingBoxProps) {
  /**
   * Sets the box as expanded if the current URL matches the given pathname.
   */
  const [isExpanded, setIsExpanded] = useState(() => {
    return Boolean(pathname && window.location.pathname === pathname);
  });

  /**
   * Toggles the expanded state of the component.
   *
   * Uses the `startViewTransition` API for smooth visual transitions when
   * available, falling back to a normal state update otherwise. Updates browser
   * history to the given `pathname` when expanded, or `/` when collapsed.
   */
  const toggleBox = useCallback(() => {
    if (!document.startViewTransition) {
      setIsExpanded((prev) => {
        const next = !prev;

        if (pathname) {
          window.history.pushState({}, "", next ? pathname : "/");
        }

        return next;
      });

      return;
    }

    document.startViewTransition(() => {
      setIsExpanded((prev) => {
        const next = !prev;

        if (pathname) {
          window.history.pushState({}, "", next ? pathname : "/");
        }

        return next;
      });
    });
  }, [pathname]);

  /**
   * Collapses the box if Escape is pressed and it's currently expanded.
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        if (pathname?.includes("/me")) {
          trackEvent("profile_shrink", { from: "profile", trigger: "escape" });
        }

        toggleBox();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isExpanded, toggleBox, pathname]);

  /**
   * Syncs the box’s expanded state with browser navigation.
   *
   * When the user uses the Back or Forward buttons, recalculates whether the
   * box should be expanded based on the current pathname.
   */
  useEffect(() => {
    const handlePopState = () => {
      const shouldBeExpanded = Boolean(
        pathname && window.location.pathname === pathname,
      );

      if (shouldBeExpanded !== isExpanded) {
        setIsExpanded(shouldBeExpanded);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname, isExpanded]);

  return (
    <div
      className={cr(
        "relative backdrop-blur-sm transition-all",
        isExpanded ? "min-h-[80vh] w-[80vw] p-8 h-auto" : "px-8 py-6",
        className,
      )}
      style={{ viewTransitionName }}
    >
      {children({ isExpanded, toggleBox })}
    </div>
  );
}
