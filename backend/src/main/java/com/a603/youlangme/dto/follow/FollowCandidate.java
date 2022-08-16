package com.a603.youlangme.dto.follow;

import lombok.Getter;

@Getter
public class FollowCandidate {
    private Long id;
    private Double sim;

    static public FollowCandidate of(Long id, Double sim) {
        FollowCandidate candidate = new FollowCandidate();
        candidate.id = id;
        candidate.sim = sim;
        return candidate;
    }
}
