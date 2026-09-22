# WORKFLOW.md

## Task 1: Push a change from Clone A
Added overtime pay (time-and-a-half for shifts over 8 hours) to `calculatePay` in Clone A, committed, and pushed successfully.

![Task 1 evidence](screenshots/task1.png)

## Task 2: Diverge from Clone B — and get rejected
In Clone B, made a conflicting change (rounding pay instead of truncating) without fetching first. The push was rejected because the remote already had Clone A's commit.

![Task 2 evidence](screenshots/task2.png)

## Task 3: Reconcile with a merge
Fetched and merged Clone A's change into Clone B, resolving the conflict so both the overtime calculation and the rounding behavior were preserved. Updated the test to match the new rounded output, confirmed tests passed, and pushed.

![Task 3 evidence](screenshots/task3.png)

## Task 4: Diverge again — reconcile with a rebase
In Clone A, made another change to `calculatePay` (added validation guards) without fetching first. The push was rejected again.

![Task 4 rejection](screenshots/task4-reject.png)

Resolved this one with `git fetch` + `git rebase` instead of a merge. Fixed the conflict, continued the rebase, confirmed tests passed, and pushed without needing to force.

![Task 4 rebase resolution](screenshots/task4-rebase.png)

## Task 5: Merge into main
Merged the finished `feature/overtime-pay` branch into `main` and pushed.

![Task 5 evidence](screenshots/task5.png)

## Task 6: Tag and write WORKFLOW.md
Tagged the final commit `v1.0-synced` and pushed the tag.

![Task 6 terminal](screenshots/task6-terminal.png)
![Task 6 GitHub tags page](screenshots/task6-github.png)

---

## Questions

**1. What did the rejected push error message tell you, and why did it happen?**

The error said `! [rejected] ... (fetch first)`, with a hint that the remote contained work I didn't have locally. This happened because my other clone had already pushed changes to the same branch on GitHub, and Git refuses to overwrite remote history it hasn't seen — I had to fetch and integrate those changes before pushing my own.

**2. What's the actual difference between how you resolved Task 3 (merge) vs Task 4 (rebase)?**

In Task 3, `git merge` combined both branches' histories into a new merge commit, tying the two parent commits together — each branch's original history stayed intact. In Task 4, `git rebase` replayed my commit on top of the updated branch instead, rewriting it as if I'd made the change after pulling in the latest updates. This kept history linear with no merge commit, but it changed my original commit's hash.

**3. What one habit would have avoided both rejected pushes in this lab?**

Running `git fetch` (or `git pull`) before making changes or attempting to push — checking whether the remote had moved ahead would have caught the divergence early, before I'd already committed conflicting work.

**4. Which approach — merge or rebase — would you default to on a shared team branch, and why?**

Merge, because rebasing rewrites commit history, which is risky once teammates have already pulled the branch — it can create confusing conflicts for everyone else. Merge preserves what actually happened and is safer for branches other people are actively working on.