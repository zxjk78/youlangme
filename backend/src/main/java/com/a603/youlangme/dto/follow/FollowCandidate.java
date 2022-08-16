package com.a603.youlangme.dto.follow;

import lombok.Getter;

@Getter
public class FollowCandidate {
    private Long id;
    private Float sim;

    static public FollowCandidate of(Long id, Float sim) {
        FollowCandidate candidate = new FollowCandidate();
        candidate.id = id;
        candidate.sim = sim;
        return candidate;
    }
}
