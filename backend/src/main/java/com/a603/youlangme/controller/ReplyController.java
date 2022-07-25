package com.a603.youlangme.controller;

import com.a603.youlangme.entity.User;
import com.a603.youlangme.dto.reply.ReplyDto;
import com.a603.youlangme.dto.reply.ReplyResponseDto;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.service.ReplyService;
import com.a603.youlangme.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "5. ReplyController")
@RestController
@RequestMapping("/reply")
public class ReplyController {

    @Autowired
    ReplyService replyService;

    @Autowired
    ResponseService responseService;

    @PostMapping("/board/{boardId}")
    public CommonResult write(@RequestBody ReplyDto replyDto,@PathVariable(value = "boardId") Long boardId){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());

        replyService.saveReply(replyDto, boardId,user.getId());
        return responseService.getSuccessResult();
    }

    @DeleteMapping("/{replyId}")
    public CommonResult deleteReply(@PathVariable(value = "boardId") Long boardId,@PathVariable(value = "replyId") Long replyId){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        replyService.deleteReply(boardId,replyId);
        return responseService.getSuccessResult();
    }

    @PutMapping("/{boardId}/{replyId}")
    public CommonResult updateReply(@RequestBody ReplyDto replyDto,@PathVariable (value = "replyId") Long replyId,@PathVariable (value = "boardId") Long boardId){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        replyService.updateReply(replyDto, boardId,user.getId());
        return responseService.getSuccessResult();
    }

    //댓글 정렬 pid -1 따로 정렬
    @GetMapping("/replyList/{boardId}")
    public ManyResult<ReplyResponseDto> readReply(@PathVariable(value = "boardId") Long boardId){
        List<ReplyResponseDto> replyDtoList=replyService.readReply(boardId);
        return responseService.getManyResult(replyDtoList);
    }


}
