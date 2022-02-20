## User Stories
The user should be able to create a potential Event.
The user should be able to 

## Utility Types

```rust

struct TimeFrame {
  from_date: f64,
  to_date: f64,
}

enum Interval {
  Day(TimeFrame),
  Custom(TimeFrame)
}
```

## Entry Types

At a basic level, we are recording 'a thing that was done', an Event, and 'how often it was done', an EventRecurrence. I will assume an interval of 1 day's duration (like Seinfeld's calendar days) but allow for a custom option.

### Event

This could be any type of event. There is an option to have a duration of event.

```rust
struct Event {
  created_at: TimeStamp
  list_hash: HeaderHashB64 // A link to the list (the specific behaviours)
  meta: HashMap<String, String>, // name, description etc.
}
```

#### Example Event

```js
{
  timeframe : {
    start: // Two weeks ago
    end: // The end of today
  },
  list_hash: // a header hash for a TDL,
  meta: {
    name: 'Meditate more',
    habit_id: '1', // For use in Redux and for fetching by tag #H1
  }
}
```

### EventRecurrence

For each Event there exists a number of slots from the time we started recording the behaviour (Event.created_at) up until the present moment. Each of these slots is a potential Space for an event to occur. If we have an event duration (not an Instant)
```rust
struct RedDot {
  timeframe: Interval::Day, // sub-interval over which the behaviour was recorded (by default a day long). This be within the Habit timeframe
  habit_hash: HeaderHashB64 // A link to the habit (the behaviour and its meta)
}
```

#### Example Habit

```js
{
  timeframe : {
    start: // Two weeks ago
    end: // Two weeks ago + 1 day
  },
  habit_hash: // a header hash for a habit,
}
```

### Todo-List

At it's most basic level, the 'thing that was done' could just be 'Write a Joke'. (A string). This is also a 'Todo-list of One Item'. To give the system more utility, I will make a Todo-list of as long as necessary, stored as a Json list of Todo-items. A Habit will thus store a reference to a list of potential actions (a Todolist). A red dot will represent an interval where the list was fully completed.

```rust
struct Todolist {
  todos: String, // a Json object containing a list of behaviours and their descriptions/completion state
}
```

#### Example TodoList

{
todos : `{"0":{"id":"1","description":"Get milk","status":false},"1":{"id":"2","description":"Get bread","status":true},"2":{"id":"3","description":"Pick up mail","status":true}}`,
}

## Links and Anchors

### ALL\_ anchors

I will create and link anchors to new entries for ALL_HABITS, ALL_TODOLISTS, ALL_RED_DOTS automatically when a new entry of that type is created.

### Relationship Links

- Each RedDot will be linked to its specific Habit and vice versa.
- Each habit will be linked to its specific Todolist.
  When these links are made, tags will be added for the habit derived from an ID that is stored in meta information (e.g. #H1).
  That way it is easy to fetch all RedDots for a Habit in one zome call.

## Additional Models

### Spaces

Although it is not necessary to store a list of intervals that **could** have been marked in the DHT (as they can be calculated automatically - each is a day long by default and subdivides the Habit timeframe) it is useful to have these intervals (Spaces) in the Redux store. This allows a sequential division of time into calendar days by 'filling in the blanks' of the RedDot intervals.

We can denote the spaces D<sub>x</sub>, D<sub>x-1</sub>, etc., counting backwards from day x (the current day, or the x<sup>th</sup> day of recording the habit.)

#### Example Space

```js
{
  timeframe : {
    start: DateTime,
    end: DateTime,
    length: Duration
  },
}
```
