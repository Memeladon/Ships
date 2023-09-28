matrixSize(10).



indexes([], _, [],_).
indexes([D|T], Acc, [Acc|Result],D) :-
    NewAcc is Acc + 1,
    indexes(T, NewAcc, Result,D).
indexes([_|T],  Acc, Result,D) :-
    NewAcc is Acc + 1,
    indexes(T, NewAcc, Result,D).


myLast([X],X).
myLast([_|T],X) :-
    myLast(T,X).


checkPosition(List, [A|T], I) :-
    matrixSize(MS),
    (   fireToTheRight(List, [A|T]) -> myLast([A|T], PREI), I is PREI + 1, !
    ;(   fireToTheDown(List, [A|T]) -> myLast([A|T], PREI), I is PREI + MS, !
     ;(   fireToTheLeft(List, [A|T]) -> I is A - 1, !
      ;(   fireToTheUp(List, [A|T]) -> I is A - MS, !; fail)))).


fire(List, I) :-
    indexes(List, 0, Indexes,2),
    (   Indexes == [] -> indexes(List, 0, ZeroIndexes,0), random_member(I,ZeroIndexes);
    checkPosition(List, Indexes, I)).


indexOf([Element|_], 0, Element).
indexOf([_|Tail], Index, Element) :-
  Index > 0,
  NextIndex is Index - 1,
  indexOf(Tail, NextIndex, Element).


fireToTheRight(List, [A]) :-
    matrixSize(MS),
    F is ((A + 1) mod MS),
    U is (0),
    not(F is U),
    N is A + 1,
    indexOf(List, N, E),
    E is 0,
    !.
fireToTheRight(List, [A,B|T]) :-
    B is A + 1,
    fireToTheRight(List, [B|T]).


fireToTheLeft(List, [A]) :-
    not(A == 0),
    matrixSize(MS),
    F is ((A - 1) mod MS),
    U is (MS - 1),
    not(F is U),
    N is A - 1,
    indexOf(List, N, E),
    E is 0,
    !.

fireToTheLeft(List, [A,B|_]) :-
    B is A + 1,
    fireToTheLeft(List, [A]).


fireToTheDown(List, [A]) :-
    matrixSize(MS),
    A + MS < MS * MS,
    N is A + MS,
    indexOf(List, N, E),
    E is 0,
    !.
fireToTheDown(List, [A,B|T]) :-
    matrixSize(MS),
    B is A + MS,
    fireToTheDown(List, [B|T]).


fireToTheUp(List, [A|_]) :-
    matrixSize(MS),
    A - MS >= 0,
    N is A - MS,
    indexOf(List, N, E),
    E is 0,
    !.
fireToTheUp(List, [A,B|_]) :-
    matrixSize(MS),
    B is A - MS,
    fireToTheUp(List, [A]).
