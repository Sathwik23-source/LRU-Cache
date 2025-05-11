🧠 LRU Cache (Least Recently Used)
This project implements an LRU Cache using a Doubly Linked List and a HashMap to achieve efficient O(1) time complexity for both get and put operations.

📌 What is an LRU Cache?
An LRU (Least Recently Used) cache is a data structure that holds a fixed number of items. When it reaches capacity, it removes the least recently accessed item before inserting a new one.

⚙️ How It Works
HashMap provides constant-time access to nodes.

Doubly Linked List tracks the order of usage:

Head = Most recently used

Tail = Least recently used

Operations:

get(key) → Returns the value if key exists and moves it to the front.

put(key, value) → Inserts or updates key and moves it to the front. If capacity is exceeded, removes the least recently used item.


📊 Data Structure Overview
[HEAD] ⇄ (key5, val5) ⇄ (key3, val3) ⇄ (key1, val1) ⇄ [TAIL]
If (key1) is accessed again, it moves to the head.

✅ Features
Efficient O(1) time for both get and put

Clean implementation using custom Node class

Easy to understand and extend
