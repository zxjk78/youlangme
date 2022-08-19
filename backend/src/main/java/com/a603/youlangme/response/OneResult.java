package com.a603.youlangme.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OneResult<T> extends CommonResult {
    private T data;
}
