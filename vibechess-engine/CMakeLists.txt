cmake_minimum_required(VERSION 3.20)
project(vibechess VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(vibechess
    src/main.cpp
    src/uci.cpp
    src/engine.cpp
    src/board.cpp
)

target_include_directories(vibechess PRIVATE src)

target_compile_options(vibechess PRIVATE
    $<$<CONFIG:Release>:-O3 -DNDEBUG>
)

enable_testing()
add_executable(perft_test
    tests/perft_test.cpp
    src/engine.cpp
    src/board.cpp
)
target_include_directories(perft_test PRIVATE src)
add_test(NAME perft_test COMMAND perft_test)
