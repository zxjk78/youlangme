package com.a603.youlangme.entity;

import com.a603.youlangme.entity.meta.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserExp extends BaseEntity{

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private Integer exp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="level_id")
    private Level level;

    public Integer addExp(Integer expToAdd) {
        this.exp += expToAdd;
        return this.exp;
    }

    public Integer changeExp(Integer expToChange) {
        this.exp = expToChange;
        return this.exp;
    }

    public Level updateLevel(Level newLevel) {
        this.level = newLevel;
        return this.level;
    }

}
