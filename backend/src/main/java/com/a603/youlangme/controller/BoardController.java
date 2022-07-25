package com.a603.youlangme.controller;

import com.a603.youlangme.dto.like.LikeUserResponseDto;
import com.a603.youlangme.entity.Board;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.dto.board.BoardDto;
import com.a603.youlangme.entity.UserBoardLike;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.BoardService;
import com.a603.youlangme.service.ResponseService;
import com.nimbusds.oauth2.sdk.SuccessResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Api(tags = "4. BoardController")
@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @Autowired
    ResponseService responseService;

    @PostMapping
    public CommonResult write(@RequestBody BoardDto boardDto){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal()); //지금 로그인한 사람 데이터 가져온 것
        boardService.savePost(boardDto,user.getId());
        return responseService.getSuccessResult();
    }

    @DeleteMapping("/{id}")
    public CommonResult delete(@PathVariable(value ="id") Long id){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        boardService.delete(id);
        return responseService.getSuccessResult();
    }

    @PutMapping("/{id}")
    public CommonResult update(@PathVariable(value = "id") Long id, BoardDto boardDto){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        boardService.updatePost(boardDto,id);
        return responseService.getSuccessResult();
    }

    @GetMapping("/{id}")
    public CommonResult read(@PathVariable(value = "id") Long id){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        boardService.read(id);
        return responseService.getSuccessResult();
    }

    @PostMapping("/like/{id}")
    public CommonResult like(@PathVariable(value = "id") Long boardId) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        boardService.likeBoard(user.getId(), boardId);
        return responseService.getSuccessResult();
    }

    @DeleteMapping("/dislike/{id}")
    public CommonResult dislike(@PathVariable(value = "id") Long boardId) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        boardService.dislikeBoard(user.getId(), boardId);
        return responseService.getSuccessResult();
    }

    @GetMapping("/likes")
    public ManyResult<Long> likes() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        return responseService.getManyResult(boardService.readUserBoardLike(user.getId()));
    }

    @GetMapping("/likeUsers/{id}")
    public ManyResult<LikeUserResponseDto> likeUsers(@PathVariable(value = "id") Long boardId) {
        return responseService.getManyResult(boardService.readLikeUsers(boardId));
    }

}
