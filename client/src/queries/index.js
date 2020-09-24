import { gql } from "@apollo/client";

export const FETCH_SNAKE = gql`
    query get_snake {
        get_snake_leaderboard {
            _id
            username
            score
        }
    }
`

export const FETCH_WHACK = gql`
    query get_whack {
        get_whack_leaderboard {
            _id
            username
            score
        }
    }
`

export const AVAILABLE_DEFS = gql`
    query available_defs {
        __schema {
            types {
                name
            }
        }
    }
`

export const DEFS_PROP = gql`
    query defs_prop {
        __type(name: "snake_leaderboard") {
        name
            fields {
                name
            }
        }
    }
`

// export const CLEAR_SNAKE_REDIS = gql`
//     query clear_snake_redis {
//         clear_snake_cache {
//         message
//         }
//     }
// `

// export const CLEAR_WHACK_REDIS = gql`
//     query clear_whack_redis {
//         clear_whack_cache {
//         message
//         }
//     }
// `  

export const POST_SNAKE = gql`
    mutation post_snake($username: String, $score: Int) {
        post_snake_leaderboard(new_leaderboard: {
            username: $username,
            score: $score,
        }) {
            _id
        }
    }
`;

export const POST_WHACK = gql`
    mutation post_whack($username: String, $score: Int) {
        post_whack_leaderboard(new_leaderboard: {
            username: $username,
            score: $score
        }) {
            _id
        }
    }
`;